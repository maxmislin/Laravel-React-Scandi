import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Errors from './Errors';
import axios from 'axios';
import { withTranslation } from 'react-i18next';


class UserGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            name_en: '',
            name_ru: '',
            name_lv: '',
            validationErrorMessage: [],
            errors: [],
            language: null,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentDidMount() {
      const { i18n } = this.props;
        axios.get('/api/categories').then(response => {
            this.setState({
                categories: response.data,
                categoryName: this.renderSwitch(i18n.language, response.data[0])
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeCheckbox(event) {
      this.setState({[event.target.name]: event.target.checked});
    }
    
    renderRedirect() {
        this.props.history.push('/')
    }

    handleSubmit(event) {
      const { i18n } = this.props;
      this.setState({language: i18n.language}, () => {
        axios({
          method: 'post',
          url: '/api/addUserGroup/submit',
          data: this.state
        })
        .then(response => {
            if(response.statusText == "OK")
            {
                this.renderRedirect();
                const { t } = this.props;

                ReactDOM.render(
                    (    
                        <div className="alert alert-success mt-2">
                            {t('AddUserGroup.add-success')}
                        </div>
                    ),
                document.getElementById("indexMsg"));
            }
        })
        .catch(error => {
            if (error.response.status == 422){
                var errors = error.response.data.errors;
                this.setState({errors:errors});
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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h1 className="h2">{t('AddUserGroup.title')}</h1>
                </div>
                    
                <form onSubmit={this.handleSubmit} id="addForm">

                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
                    <h3 className="h3">{t('AddUserGroup.user-group-h3')}</h3>
                    </div>

                    <div className="col-md-3 mb-3">  
                    <label htmlFor="name_en">{t('Category.label-for-name-en')}</label>
                    <input type="text" className="form-control" name="name_en" value={this.state.name_en} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">  
                    <label htmlFor="name_ru">{t('Category.label-for-name-ru')}</label>
                    <input type="text" className="form-control" name="name_ru" value={this.state.name_ru} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">  
                    <label htmlFor="name_lv">{t('Category.label-for-name-lv')}</label>
                    <input type="text" className="form-control" name="name_lv" value={this.state.name_lv} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label>{t('AddUserGroup.category-switcher')}</label>
                        <div id="newCategories mt-2">
                        {this.state.categories.map(category => {
                            var categoryName = this.renderSwitch(i18n.language, category);
                            return (
                              <div>
                                <label htmlFor="CheckBoxReq">{categoryName}</label>
                                <input type="checkbox" name={categoryName} onChange={this.handleChangeCheckbox} className="ml-1" id="req" />
                              </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    
                    <div className="col-md-3 mb-3">
                    <button form="addForm" type="submit" className="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
                        <h6>{t('AddUserGroup.save-btn')}</h6>
                    </button>
                    </div>
                </form>
            </div>
        );
    }

}


const UserGroupComponent = withTranslation()(UserGroup);

export default UserGroupComponent;
