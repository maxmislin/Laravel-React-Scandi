import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import FormSwitchComponent from './ProductAdd/FormSwitch';
import axios from 'axios';
import Errors from './Errors';
import { withTranslation } from 'react-i18next';

class ProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            categoryName: '', 
            validationErrorMessage: [],
            name: '',
            sku: '',
            price: '',
            image: null,
            productAttributes: {},
            errors: [],
            key: null,
            language: null
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSwitcher = this.handleChangeSwitcher.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction(aName, aValue, isHidden) {
        const newAttr = {...this.state.productAttributes, [aName]:{value:aValue, isHidden: isHidden}}
        this.setState({productAttributes: newAttr});
    }

    renderRedirect() {
        this.props.history.push('/')
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

    componentDidUpdate(prevProps) {
      const { i18n } = this.props;

      if (prevProps !== this.props) {
        this.setState({
          categoryName: this.renderSwitch(i18n.language, this.state.categories[0])
        });
      }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChangeSwitcher(event) {
        this.setState({
            [event.target.name]: event.target.value,
            productAttributes: {}
        });
    }

    handleChangeImage(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }

    handleChangeImage(event) {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (event) => {
          this.setState({
            image: event.target.result
          })
        };
        reader.readAsDataURL(file);
    }

    reload() {
        this.setState({ key: Math.random() });
    }

    handleSubmit(event) {
      const { i18n } = this.props;
      this.setState({language: i18n.language}, () => {
        axios({
          method: 'post',
          url: '/api/apply/submit',
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
                            {t('ProductAdd.add-success')}
                        </div>
                    ),
                document.getElementById("indexMsg"));
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

        return (
            <div className="container">
                {Object.keys(this.state.errors).length != 0 &&
                    <Errors errors={this.state.errors} />
                }
                <div id="applyMsg"></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h2 className="h2">{t('ProductAdd.title')}</h2>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                        <Link className="btn btn-sm btn-outline-secondary py-2 px-2" to="/addCategory">{t('ProductAdd.addCategory-btn')}</Link>
                        </div>
                        <div className="btn-group mr-2">
                        <Link className="btn btn-sm btn-outline-secondary py-2 px-2" to="/addAtribute">{t('ProductAdd.addAttribute-btn')}</Link>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="col-md-3 mb-3">  
                        <label htmlFor="sku">{t('ProductAdd.label-for-sku')}</label>
                        <input type="text" className="form-control" name="sku" value={this.state.sku} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="name">{t('ProductAdd.label-for-name')}</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="price">{t('ProductAdd.label-for-price')}</label>
                        <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.handleChange} required="" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="image">{t('ProductAdd.label-for-image')}</label>
                        <input type="file" name="image" onChange={this.handleChangeImage} />
                    </div>

                    <div className="col-md-2 mb-3">
                        <label>{t('ProductAdd.type-switcher')}</label>
                            <select className="browser-default custom-select" id="switcher" name="categoryName" value={this.state.categoryName} onChange={this.handleChangeSwitcher}>
                                {this.state.categories.map(category => {
                                    var categoryName = this.renderSwitch(i18n.language, category);
                                    return (<option value={categoryName}>{categoryName}</option>)
                                    }
                                  )
                                }
                            </select>
                    </div>
                            
                    <FormSwitchComponent applyCallback = {this.callbackFunction} switcher={this.state.categoryName} productAttributes={this.state.productAttributes} />

                    <div className="col-md-3 mb-3">
                    <button type="submit" className="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
                        <h6>{t('ProductAdd.save-btn')}</h6>
                    </button>
                    </div>
                </form>
            </div>
        );
    }

}

const ProductAddComponent = withTranslation()(ProductAdd);

export default ProductAddComponent;
