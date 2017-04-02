import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../../util/api.jsx';
import Dialog from '../../partials/dialog/dialog.jsx';
import TYPES from '../../util/types.jsx';
import Loader from "../../partials/loader/loader.jsx";
import WeatherComponent from "./weatherComponent/weatherComponent.jsx";

import style from './mainPage.scss';

export default class MainPage extends React.Component {
    static defaultProps = {
        url : 'http://api.openweathermap.org/data/2.5/weather?',
        key : '53f9d8e4213222cf517d86dc406d67fc',
        metric: TYPES.UNITS.METRIC
    };

    static propTypes = {
        url: React.PropTypes.string,
        key: React.PropTypes.string,
        metric: React.PropTypes.oneOf([TYPES.UNITS.METRIC,TYPES.UNITS.IMPERIAL])
    };

    constructor(props){
        super(props);
        this.state = {
            data: null,
            lat: null,
            lon: null,
            showPrompt: true,
            showApp: false,
            errors: false,
            loading: true
        };

        const success = (response) => {
            this.setState({
                data : response,
                loading:false,
                showApp: true
            });
        };

        const error = (response) => {
            this.setState({errors: 'Error Occurred: '+response})
        };

        this.getWeather = (url,key,lat,lon,metric) => {
            this.setState({loading: true});
             Api.call(url,key,lat,lon,metric,success,error);
        };

        this.getCoordinates = () => {
            if (navigator.geolocation) {
                this.setState({loading: true});
                navigator.geolocation.getCurrentPosition(
                    this.setCoordinates,
                    (error) => {
                        error.code === error.PERMISSION_DENIED ?
                            this.setState({errors: 'You have to disabled location for this service, please re-enable it to get your current location',loading: false})
                            :false
                    })
            } else {
                this.setState({errors: 'Geolocation is not supported by this browser',loading: false});
            }
        };

        this.setCoordinates = (location) =>{
            if(location){
                this.setState({
                    loading: false,
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                });
                this.getWeather(
                    this.props.url,
                    this.props.key,
                    this.state.lat,
                    this.state.lon,
                    this.props.metric
                );
            }else{

            }
        };

        this.dialogConfirm = this.dialogConfirm.bind(this);
        this.dialogCancel = this.dialogCancel.bind(this);
        this.refresh = this.refresh.bind(this);
        this.restartApp = this.restartApp.bind(this);
    }

    componentDidMount() {
        this.setState({loading: false});
    }


    dialogConfirm() {
        this.getCoordinates();
        this.setState({showPrompt:false});
    };

    dialogCancel() {
        this.setState({showPrompt:false, errors:'Permission required to get current weather'});
    };

    refresh(){
        this.setState({showApp: false});
        this.getCoordinates();
    }

    restartApp(){
        this.setState({errors: false, showPrompt: true})
    }

    render() {
        return (
            <div className={style.mainContainer}>
                {/*Dialog to request access*/}
                {this.state.showPrompt ? (<Dialog
                    type={TYPES.DIALOG.ALERT}
                    text='This app requires retrieving your current location, proceed?'
                    button1={'Confirm'}
                    button2={'Cancel'}
                    function1={this.dialogConfirm}
                    function2={this.dialogCancel}
                />):null}

                {/*Loader*/}
                <Loader loading={this.state.loading}/>

                {/*Errors displayed to user*/}
                {this.state.errors?
                    (
                        <Dialog
                            type={TYPES.DIALOG.WARNING}
                            text={this.state.errors}
                            button1={false}
                            button2={'OK'}
                            function2={this.restartApp}
                        />
                ):null}

                {/*Display Weather Data*/}
                {this.state.showApp ? (
                    <WeatherComponent data={this.state.data} refreshFunction={this.refresh}/>
                    ): null}

            </div>
        );
    }
}