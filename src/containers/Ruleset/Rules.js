import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import * as rulesEngine from 'store/rulesEngine';
import { Timeline, Icon, Card, Button } from 'antd';

import RuleValue from './RuleValue';
import { SelectField } from 'redux-form-antd';

class Rules extends React.Component {
  handleFactChange = fact => {
    this.props.changeFact(fact);
  };

  render() {
    const {
      rulesEngine,
      fields,
      meta: { touched, error, submitFailed },
    } = this.props;

    const { facts } = rulesEngine;

    // After the rule is tested and evaluates to true,
    // it needs to be marked with the follow dot and circle
    const ruleSuccessDot = (
      <Icon type="check-circle-o" style={{ fontSize: '16px' }} />
    );
    const ruleSuccessColor = 'green';
    return (
      <div className="rules-container">
        <div className="toolbar" style={{ marginBottom: '20px' }}>
          <Button
            title="Add Rule"
            icon="plus"
            type="primary"
            onClick={() => fields.push({})}
          >
            Add Rule
          </Button>
        </div>
        {fields.length === 0 && (
          <Card style={{ width: 300 }}>
            Hmm... there are no rules in this ruleset. Start by adding them
          </Card>
        )}
        {(touched || submitFailed) && error && <span>{error}</span>}
        <Timeline>
          {fields.map((rule, index) => (
            <Timeline.Item dot={ruleSuccessDot} color={ruleSuccessColor}>
              <div className="rule" key={index}>
                <div className="field-container">
                  <span>Rule #{index + 1}</span>
                </div>
                <Button
                  className="field-container"
                  type="danger"
                  title="Remove Rule"
                  icon="delete"
                  onClick={() => fields.remove(index)}
                />
                <div className="field-container">
                  <Field
                    name={`${rule}.fact`}
                    component={SelectField}
                    onSelect={this.handleFactChange}
                    options={facts.map(f => ({
                      label: f.label,
                      value: f.name,
                    }))}
                  />
                </div>
                <div className="field-container">
                  <Field
                    name={`${rule}.condition`}
                    component={SelectField}
                    onChange={null}
                    options={rulesEngine.conditions}
                  />
                </div>
                <div className="field-container">
                  <RuleValue rule={rule} />
                </div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { rulesEngine: state.rulesEngine };
};

const mapDispatchToProps = {
  ...rulesEngine.actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
