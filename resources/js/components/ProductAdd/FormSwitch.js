import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

class FormSwitch extends Component {
  constructor() {
    super();
    this.initialState = {
      categories: [],
      attributes: [],
      productAttributes: {},
    };
    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }

  componentDidMount() {
    axios.get('/api/attributes').then((response) => {
      this.setState({
        categories: response.data.categoryData,
        attributes: response.data.atributeData,
      });
    }).catch((errors) => {
      console.log(errors);
    });
  }

  handleChange(event) {
    event.preventDefault();
    const isHiddenValue = this.state.productAttributes[event.target.name] ? this.state.productAttributes[event.target.name].isHidden : false;
    const newAttr = {...this.state.productAttributes, [event.target.name]:{value:event.target.value, isHidden: isHiddenValue}}
    this.setState({productAttributes: newAttr});
    this.props.applyCallback(event.target.name, event.target.value, isHiddenValue);
  }

  handleChangeCheckBox(event) {
    const attrValue = this.state.productAttributes[event.target.name] ? this.state.productAttributes[event.target.name].value : '';
    const newAttr = {...this.state.productAttributes, [event.target.name]:{value:attrValue, isHidden: event.target.checked}}
    this.setState({productAttributes: newAttr});
    this.props.applyCallback(event.target.name, attrValue, event.target.checked);
  }

  renderSwitch(lang, item) {
    switch (lang) {
      case 'en':
        return item.name_en;
      case 'ru':
        return item.name_ru;
      case 'lv':
        return item.name_lv;
      default:
        return item.name_en;
    }
  }

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="col-md-3 mb-3">
        {this.state.categories.map((category) => {
          const categoryName = this.renderSwitch(i18n.language, category);
          return (categoryName === this.props.switcher
          && this.state.attributes.map((attribute) => {
            const attributeName = this.renderSwitch(i18n.language, attribute);
            return (category.id === attribute.category_id
            && (
              <div>
                <label htmlFor={categoryName} className="mt-2">{attributeName}</label>
                {attribute.units != null ? (
                  <p className="tip">
                    {t('ProductAdd.tip-1')}
                    {attributeName}
                    {t('ProductAdd.tip-2')}
                    {attribute.units}
                  </p>
                ) : (
                  <p>
                    {t('ProductAdd.tip-1')}
                    {attributeName}
                  </p>
                )}
                <input type="text" className="form-control" name={attributeName} onChange={this.handleChange} required="" />
                <label htmlFor="hidden" className="mt-2">{t('ProductAdd.label-for-hidden')}</label>
                <input type="checkbox" className="ml-1" name={attributeName} onChange={this.handleChangeCheckBox} required="" />
              </div>
            )
            );
          })
          );
        })}
      </div>
    );
  }
}

const FormSwitchComponent = withTranslation()(FormSwitch);

export default FormSwitchComponent;
