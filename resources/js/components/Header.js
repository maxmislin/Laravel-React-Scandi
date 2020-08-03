import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyList: [],
      key: null,
    };
  }

  componentDidMount() {
    fetch('https://www.floatrates.com/daily/usd.json').then((response) => response.json()).then((data) => {
      this.setState({
        currencyList: [
          { code: 'USD', rate: 1 },
          data.eur,
          data.gbp,
          data.rub,
        ],
      }, () => {
        this.state.currencyList.forEach((currency) => {
          localStorage.setItem(currency.code, currency.rate);
        });
        if (localStorage.getItem('currentCurrency') != undefined) return;
        localStorage.setItem('currentCurrency', this.state.currencyList[0].code);
        this.setState({ key: Math.random() });
      });
    }).catch((errors) => {
      console.log(errors);
    });
  }

  handleChangeSwitcher(event) {
    localStorage.setItem('currentCurrency', event.target.value);
    window.location.reload(false);
  }

  handleClick(lang, i18n) {
    i18n.changeLanguage(lang);
  }

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="site-header">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4">
          <h5 className="header-title my-0 mr-md-auto font-weight-normal">Scandiweb</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 header-navigation " to="/">
              {t('Header.nav-to-productList')}
            </Link>
            <Link className="p-2 header-navigation " to="/apply">
              {t('Header.nav-to-productAdd')}
            </Link>
            <Link className="p-2 header-navigation " to="/addUserGroup">
              {t('Header.nav-to-addUserGroup')}
            </Link>
          </nav>
        </div>
        <div className="d-flex justify-content-end mr-5">
          <button onClick={() => this.handleClick('en', i18n)} type="button" className="astext header-navigation pr-2 pb-2">EN</button>
          <button onClick={() => this.handleClick('ru', i18n)} type="button" className="astext header-navigation pr-2 pb-2">RU</button>
          <button onClick={() => this.handleClick('lv', i18n)} type="button" className="astext header-navigation pr-2 pb-2">LV</button>
          <select className="select-currency mb-2 header-navigation" id="switcher" name="userGroupName" onChange={this.handleChangeSwitcher}>
            <option>{localStorage.getItem('currentCurrency')}</option>
            {this.state.currencyList.map((currency) => currency.code !== localStorage.getItem('currentCurrency')
                      && <option>{currency.code}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

const HeaderComponent = withTranslation()(Header);

export default HeaderComponent;
