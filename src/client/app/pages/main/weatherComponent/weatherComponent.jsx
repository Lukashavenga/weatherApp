import React from 'react';
import ComponentWrapper from '../../../partials/wrappers/componentWrapper.jsx';

import style from './weatherComponent.scss';

export default class WeatherComponent extends React.Component {
    static defaultProps = {

    };

    static propTypes = {
        data: React.PropTypes.object,
        refreshFunction : React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {data : props.data};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({ data: nextProps.data });
        }
    }

    render() {
        return (
            <ComponentWrapper>
                <div className={style.weatherData}>
                    <div className={style.cityName}>
                        <span className={style.subText}>Closest hub: </span>
                        {this.state.data ? this.state.data.name : 'Unknown'}
                    </div>
                    <hr/>
                    <div className={style.description}>
                        {
                            this.state.data && this.state.data.weather.length > 0 ?
                                this.state.data.weather[0].description
                                : ''
                        }
                        {this.state.data && this.state.data.weather.length > 0 ?(
                        <img
                            src={
                                'http://openweathermap.org/img/w/' +
                                this.state.data.weather[0].icon+'.png'
                            } alt="Current Weather"/>
                    ): null}
                    </div>
                    <div className={style.temperature}>
                            <span className={style.subText}>Temperature: </span>
                                {this.state.data && this.state.data.main ?(
                                    Math.round(this.state.data.main.temp)
                                ): ''}
                            <span className={style.degree}>
                                &deg;C
                            </span>
                    </div>
                    <div className={style.summary}>
                        <div>
                            <span>Min: </span> {
                            this.state.data && this.state.data.main ?
                                Math.round(this.state.data.main.temp_min)
                                : '-'}
                            <span className={style.degree}>
                                &deg;C
                            </span>
                        </div>
                        <div>
                            <span>Max: </span> {
                            this.state.data && this.state.data.main ?
                                Math.round(this.state.data.main.temp_max)
                                : '-'}
                            <span className={style.degree}>
                                &deg;C
                            </span>
                        </div>
                        <div>
                            <span>Wind: </span> {
                            this.state.data && this.state.data.main ?
                                Math.round(this.state.data.wind.speed)
                                : '-'}
                            <span className={style.degree}>
                                km/ph
                            </span>
                        </div>
                    </div>
                    <div className={style.refresh} onClick={this.props.refreshFunction}>
                        <img src='public/resources/arrow-refresh-2-icon.png' alt='Refresh' />
                    </div>
                </div>
            </ComponentWrapper>
        )
    }
}