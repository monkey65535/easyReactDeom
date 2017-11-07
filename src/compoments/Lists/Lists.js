import React, {Component} from 'react';
import {Link} from 'react-router';
import './lists.css';
import Axios from 'axios';
import {Spin} from 'antd';

class Lists extends Component {
    constructor() {
        super();
        this.state = {
            newData: []
        }
    }

    componentWillMount() {
        //    获取数据  "http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count
        Axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                this.setState({
                    newData: [...res.data]
                })
            }
        })
    }

    render() {
        const {newData} = this.state;
        let newsItems = newData.length > 0 ? newData.map((el) => {
            const {title,date,type,uniquekey,thumbnail_pic_s} = el;
            return (
                <Link className={`list-items`} to={`details/${uniquekey}`} key={uniquekey}>
                    <div className="list-item-left">
                        <img src={thumbnail_pic_s} alt="" className="list-imgs" width='100' height='100'/>
                    </div>
                    <div className="list-item-right">
                        <h5 className="item-title">{title}</h5>
                        <div className="tags">
                            <span className="tag-name">{type}</span>
                            <span className="news-time">{type}</span>
                        </div>
                    </div>
                </Link>
            )
        }) : (<Spin></Spin>);
        return (
            <div className={`list-container`}>
                {newsItems}
            </div>

        )
    }
}

export default Lists;