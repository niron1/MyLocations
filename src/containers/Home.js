import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Categories from '../components/Categories';
import * as actionCreators from '../actions';
import Locations from '../components/Locations';
import EditCategory from '../components/EditCategory';
import ViewCategory from '../components/ViewCategory';
import EditLocation from '../components/EditLocation';
import ViewLocation from '../components/ViewLocation';
import Main from '../components/Main';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.history = createHistory();
  }

  render() {
    const generalProps = {
      ...this.props.state.GeneralReducer,
      ...this.props.actions,
    };
    const statefulCategories = { ...generalProps, categories: this.props.state.CategoriesReducer };
    const statefulLocations = { ...generalProps, locations: this.props.state.LocationsReducer, categories: this.props.state.CategoriesReducer };
    return (
      <ConnectedRouter history={this.history}>
        <Switch>
          <Route exact path="/categories" render={() => <Categories {...statefulCategories} />} />
          <Route path="/categories/view/:categoryId" render={() => <ViewCategory {...statefulCategories} />} />
          <Route path="/categories/edit/:categoryId" render={() => <EditCategory {...statefulCategories} />} />
          <Route path="/categories/add" render={() => <EditCategory {...statefulCategories} />} />
          <Route exact path="/locations" render={() => <Locations {...statefulLocations} />} />
          <Route path="/locations/view/:locationId" render={() => <ViewLocation {...statefulLocations} />} />
          <Route path="/locations/edit/:locationId" render={() => <EditLocation {...statefulLocations} />} />
          <Route path="/locations/add" render={() => <EditLocation {...statefulCategories} />} />
          <Route path="/" component={Main} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

const mapStateToProps = (state) => ({
  state,
});

const statefulHomescreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default statefulHomescreen;
