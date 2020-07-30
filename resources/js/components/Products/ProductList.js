/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { withTranslation } from 'react-i18next';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      attributes: [],
    };

    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentDidMount() {
    axios.get('/api/product').then((response) => {
      this.setState({
        products: response.data.productData,
        attributes: response.data.atributeData,
      });
    }).catch((errors) => {
      console.log(errors);
    });
  }

  handleChangeCheckbox(event) {
    this.props.applyCallback(event.target.value, event.target.checked);
  }

  renderSwitch(lang, item) {
    switch(lang) {
      case 'en':
        return item.name_en;
      case 'ru':
        return item.name_ru;
      case 'lv':
        return item.name_lv;
      default:
        return item.name_en;;
    }
  }

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="d-flex flex-wrap">
        {this.state.products.map((product) => (
          this.props.category_ids.includes(product.category_id)
          &&(
          <div className="card mb-4 shadow-sm">
            <picture>
              <source type="image/webp" srcSet={`images/webp/${product.picture}.webp`} />
              <source type="image" srcSet={`images/${product.picture}`} />
              <img className="card-img-top img-fluid" src={`images/${product.picture}`} alt="Product" />
            </picture>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>{product.sku}</li>
                <li>{product.name}</li>
                <li>
                  {t('ProductList.card-price')}
                  {product.price}
                  {' '}
                  $
                </li>
                {this.state.attributes.map((attribute) => (
                  attribute.product_id === product.id && attribute.hidden === 0
                    && (
                    <li>
                      {this.renderSwitch(i18n.language, attribute)}
                      :
                      {' '}
                      {attribute.attribute}
                      {' '}
                      {attribute.units}
                    </li>
                    )
                ))}
              </ul>
            </div>
            <div align="right" className="checkbox-inline custom-checkbox mr-3">
              <label htmlFor="delete" className="mr-1">{t('ProductList.card-delte')}</label>
              <input type="checkbox" name="id[]" value={product.id} onChange={this.handleChangeCheckbox} />
            </div>
          </div>
        )))}
      </div>
    );
  }
}

const ProductListComponent = withTranslation()(ProductList);

export default ProductListComponent;
