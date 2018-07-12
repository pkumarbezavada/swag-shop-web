import React, {component} from 'react';
import './product.css';
import DataService from '../service/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from  '../service/notification';
let ds = new DataService();
let ns = new NotificationService();

class Product extends component{
    
    constructor(props) {
        
        super(props);
        this.state = {onWishList: ds.itemOnWishList()};
                      
                      this.onButtonClicked = this.onButtonClicked.bind(this);
           this.onWishListChanged = this.onWishListChanged.bind(this);
        
    }
    
       componentDidMount() {
        
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }
        
    
    componentWillUnmount() {
        ns.addObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    
    onWishListChanged(newWishList){
        
        this.setState({onWishList: ds.itemOnWishList(this.props.product)});
        
    }
    
        onButtonClicked = () => {
            
            if (this.state.onWishList){
                
                ds.removeWishListItem(this.props.product);
                
            } else {
                
             ds.addWishListItem(this.props.product);   
                
            }
            
            
        }
        
        
    render() {
        
        var btnClass;
        
        if(this.state.onWishList) {
            
            btnClass = "btn btn-danger";
        } else {
            
            btnClass = "btn btn-primary";
        }
        
        
        return(
        <div className="card product">
        
        <img className="card-img-top" src={this.props.imgUrl} alt="Product"></img>
            <div className="card-block">
            <h4 className="card-title">{this.props.title}</h4>
                <p classNmae="card-text">price:${this.props.price}</p>
                <a href="#" onClick= {() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove from wishlist" : "Add to cart" }</a>
            
            </div>
        
        
        </div>
        );
    }
    
    
}

export default Product;