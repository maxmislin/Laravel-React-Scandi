import React, { Component } from 'react';
import ProductListComponent from './Products/ProductList';
import axios from 'axios';
import Errors from './Errors';
import { withTranslation } from 'react-i18next';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            key: null,
            errors: [],
            success: false,
            language: null,
            userGroups: [],
            userGroupCategories: [],
            category_ids: [],
            categories: []
        }

        this.handleChangeSwitcher = this.handleChangeSwitcher.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
      axios.get('/api/userGroup').then((response) => {
        this.setState({
          userGroups: response.data.userGroups,
          userGroupCategories: response.data.userGroupCategories,
          categories: response.data.categories
        });
        response.data.categories.map(category => {
          this.state.category_ids.push(category.id);
        }, this.reload())
      }).catch((errors) => {
        console.log(errors);
      });
    }

    callbackFunction(id, checked) {
        if (checked == true)
            this.setState({ id: [...this.state.id, id] })
        else{
            var filteredArray = this.state.id.filter(function(e) { return e !== id });
            this.setState({id: filteredArray});
        }
    }

    reload() {
        this.setState({ key: Math.random() });
    }

    handleChangeSwitcher(event) {
      if (event.target.value == 'All products' || event.target.value == 'Все продукты' || event.target.value == 'Visi produkti'){
        this.state.category_ids = [];
        this.state.categories.map(category => {
          this.state.category_ids.push(category.id);
        }, this.reload())
      }
      else{
        this.state.category_ids = [];
        this.state.userGroupCategories.map(userGroupCategory => 
          this.state.userGroups.map(userGroup => {
            if (event.target.value == userGroup.name_en || event.target.value == userGroup.name_ru || event.target.value == userGroup.name_lv)
              if (userGroup.id == userGroupCategory.user_group_id)
                this.state.category_ids.push(userGroupCategory.category_id);
        }), this.reload())
      }  
      event.preventDefault();
    }

    handleSubmit(event) {
      const { i18n } = this.props;
      this.setState({language: i18n.language}, () => {
        axios({
          method: 'post',
          url: '/api/delete',
          data: this.state
        })
        .then(response => {
            if(response.statusText == "OK")
            {
                this.reload();
                this.setState({id: []});
                this.setState({success:true});
            }
        })
        .catch(error => {
            if (error.response.status == 422){
                var errors = error.response.data.errors;
                this.setState({errors:errors})
            }
            else
                console.log(error);
        });
      });
        
      event.preventDefault();
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
      console.log(this.state);
        return (
            <div className="container">
                {Object.keys(this.state.errors).length != 0 &&
                    <Errors errors={this.state.errors} />
                }
                {this.state.success &&
                  <div className="alert alert-success mt-2">
                    {t('ProductList.delete-success')}
                  </div>
                }
                <div id="indexMsg"></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h2 className="h2">{t('ProductList.title')}</h2>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button form="DeleteForm" type="submit" className="btn btn-sm btn-outline-secondary py-2 px-2">{t('ProductList.mass-delete')}</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 ml-2">
                        <label>{t('ProductList.user-group-switch')}</label>
                            <select className="browser-default custom-select" id="switcher" name="userGroupName" onChange={this.handleChangeSwitcher}>
                                  <option>{t('ProductList.all-products-option')}</option>
                                  {this.state.userGroups.map(userGroup => {
                                    var userGroupName = this.renderSwitch(i18n.language, userGroup);
                                    return (<option value={userGroupName}>{userGroupName}</option>)
                                    }
                                  )
                                  }
                            </select>
                </div>

                <form id="DeleteForm" onSubmit={this.handleSubmit}>
                <ProductListComponent key={this.state.key} category_ids={this.state.category_ids} applyCallback = {this.callbackFunction} />
                </form>
            </div>
        );
    }

}

const ProductsComponent = withTranslation()(Products);

export default ProductsComponent;