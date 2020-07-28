import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Errors from './Errors';
import axios from 'axios';
import { withTranslation } from 'react-i18next';


class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name_en: '',
            name_ru: '',
            name_lv: '',
            validationErrorMessage: [],
            errors: [],
            language: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    renderRedirect() {
        this.props.history.push('/')
    }

    handleSubmit(event) {
      const { i18n } = this.props;
      this.setState({language: i18n.language}, () => {
        axios({
          method: 'post',
          url: '/api/addCategories/submit',
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
                            {t('Category.add-success')}
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


    render() {
      const { t } = this.props;

        return (
            <div className="container">
                {Object.keys(this.state.errors).length != 0 &&
                    <Errors errors={this.state.errors} />
                }
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h1 className="h2">{t('Category.title')}</h1>
                </div>
                    
                <form onSubmit={this.handleSubmit} id="addForm">

                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
                    <h3 className="h3">{t('Category.category-h3')}</h3>
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
                    <button form="addForm" type="submit" className="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
                        <h6>{t('Category.save-btn')}</h6>
                    </button>
                    </div>
                </form>
            </div>
        );
    }

}


const CategoryComponent = withTranslation()(Category);

export default CategoryComponent;
