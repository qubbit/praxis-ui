import api from '../utils/api.js';
import uniqueId from 'lodash/uniqueId';
import { OPERATORS, FACTS } from '../store/schema.js';
import {
  RULE_OP_ADD_RULE,
  RULE_OP_ADD_RULE_GROUP,
  RULE_OP_UPDATE_RULE,
  RULE_OP_UPDATE_RULE_GROUP,
  RULE_OP_REMOVE_RULE,
  RULE_OP_REMOVE_RULE_GROUP,
  TEST_RULESET_SUCCESS,
  TEST_RULESET_FAILURE
} from './types.js';

export function addRule(parentId) {
  const id = uniqueId();

  return dispatch =>
    dispatch({
      type: RULE_OP_ADD_RULE,
      data: {
        id,
        parentId,
        rule: {
          id,
          fact: FACTS[0].name,
          operator: OPERATORS[0].value,
          value: ''
        }
      }
    });
}

export function addRuleGroup(parentId) {
  const id = uniqueId();

  return dispatch =>
    dispatch({
      type: RULE_OP_ADD_RULE_GROUP,
      data: {
        id,
        parentId,
        rule: { id, condition: 'all', children: [] }
      }
    });
}

export function updateRule(id, object) {
  return dispatch =>
    dispatch({
      type: RULE_OP_UPDATE_RULE,
      data: {
        id,
        object
      }
    });
}

export function updateRuleGroup(id, object) {
  return dispatch =>
    dispatch({
      type: RULE_OP_UPDATE_RULE_GROUP,
      data: {
        id,
        object
      }
    });
}

export function removeRule(id, parentId) {
  return dispatch =>
    dispatch({ type: RULE_OP_REMOVE_RULE, data: { id, parentId } });
}

export function removeRuleGroup(id, parentId) {
  return dispatch =>
    dispatch({ type: RULE_OP_REMOVE_RULE_GROUP, data: { id, parentId } });
}

export function testRuleset(data) {
  return dispatch =>
    api
      .post('/validate_rules', data)
      .then(response => {
        dispatch({ type: TEST_RULESET_SUCCESS, response });
      })
      .catch(error => {
        dispatch({ type: TEST_RULESET_FAILURE, error });
      });
}

export default {
  addRule,
  addRuleGroup,
  updateRule,
  updateRuleGroup,
  removeRule,
  removeRuleGroup,
  testRuleset
};
