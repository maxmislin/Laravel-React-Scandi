import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(lang, i18n) {
    i18n.changeLanguage(lang);
  }

    render() {
      const { t, i18n } = this.props;

        return (
            <div className="site-header">
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 shadow-sm">
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
                  <button onClick={()=>this.handleClick('en', i18n)} className="astext header-navigation pr-2 pb-2">EN</button>
                  <button onClick={()=>this.handleClick('ru', i18n)} className="astext header-navigation pr-2 pb-2">RU</button>
                  <button onClick={()=>this.handleClick('lv', i18n)} className="astext header-navigation pr-2 pb-2">LV</button>
                </div>
            </div>
        );
    }

}

const HeaderComponent = withTranslation()(Header);

export default HeaderComponent;