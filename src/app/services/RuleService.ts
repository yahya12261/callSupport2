
import { Entity, getRepository, Repository } from "typeorm";
import { Rule } from "../models/entities/Rule";
import { IRule } from "../models/Rule";
import BaseService from "./BaseService";
import { IPosition } from "../models/Position";
import { Position } from "../models/entities/Position";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { User } from "../models/entities/User";
import { EntityType } from "../models/type/EntityType";
class RuleService extends BaseService<Rule, IRule> {
  protected getEntityClass(): typeof Rule {
    return Rule;
  }

  async addPositionRule(
    ruleId: number,
    positionId: number
  ): Promise<boolean | null> {
    try {
      // Get the existing Position and Rule entities
      const repository = this.getRepository()
      const positionRepository = getRepository(Position);
      const position = await positionRepository.findOne({ id: positionId });
      const rule = await repository.findOne({ id: ruleId });

      // Add the new association
      if(position&& rule){
      position.rules= [rule];
      rule.positions = [position];
  
      // Save the updated entities
      await positionRepository.save(position);
      await repository.save(rule);
  
      return true;
      }
      else{
        return false;
      }
    } catch (err) {
      console.error('Error adding position-rule association:', err);
      return Promise.reject(new APIError('Error adding position-rule association', Err.InternalServerError));
    }
  }

  async addSpecificUserRule(
    ruleId: number,
    userId: number
  ): Promise<boolean | null> {
    try {
      // Get the existing Position and Rule entities
      const repository = this.getRepository()
      const UserRepository = getRepository(User);
      const user = await UserRepository.findOne({ id: userId });
      const rule = await repository.findOne({ id: ruleId });

      // Add the new association
      if(user&& rule){
        user.rules= [rule];
        rule.users = [user];
  
      // Save the updated entities
      await UserRepository.save(user);
      await repository.save(rule);
  
      return true;
      }
      else{
        return false;
      }
    } catch (err) {
      console.error('Error adding position-rule association:', err);
      return Promise.reject(new APIError('Error adding position-rule association', Err.InternalServerError));
    }
  }

  async addUserRules(
    userId: number
  ): Promise<boolean | null> {
    try {
      // Get the existing User, Position, and Rule entities
      const userRepository = getRepository(User);
      const positionRepository = getRepository(Position);
      const repository = this.getRepository();
      const user = await userRepository.findOne({ where: { id: userId }, relations: ['position', 'rules'] });
      const position = await positionRepository.findOne({ where: { id: user?.position?.id }, relations: ['rules'] });
  
      if (!user || !position) {
        return false;
      }
  
      // Get all rules associated with the user's position
      const positionRules = await repository.find({ where: { positions: { id: position.id } } });
  
      // Filter out the rules that the user is already associated with
      const availableRules = positionRules.filter(rule => !user.rules.some(r => r.id === rule.id));
  
      // Add the association between the user and the available rules
      user.rules.push(...availableRules);
      availableRules.forEach(rule => rule.users.push(user));
  
      // Save the updated entities
      await userRepository.save(user);
      await repository.save(availableRules);
  
      return true;
    } catch (err) {
      console.error('Error adding user-rule association:', err);
      return Promise.reject(new APIError('Error adding user-rule association', Err.InternalServerError));
    }
  }

  async deleteUserRules(
    userId: number
  ): Promise<boolean | null> {
    try {
      const userRepository = getRepository(User);
      const ruleRepository = this.getRepository();
  
      // Fetch the user entity with its associated rules
      const user = await userRepository.findOne({ where: { id: userId }, relations: ['rules'] });
  
      if (!user) {
        return false;
      }
  
      // Remove the association between the user and all its rules
      user.rules = [];
      await userRepository.save(user);
  
      // Update the rules to remove the association with the user
      const rules = await ruleRepository.find({ where: { users: { id: user.id } } });
      rules.forEach(rule => {
        rule.users = rule.users.filter(u => u.id !== user.id);
      });
      await ruleRepository.save(rules);
  
      return true;
    } catch (err) {
      console.error('Error deleting user-rule associations:', err);
      return Promise.reject(new APIError('Error deleting user-rule associations', Err.InternalServerError));
    }
  }

}
export { RuleService };