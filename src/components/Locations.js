import React from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { withRouter } from 'react-router';
import BottomNavbar from './BottomNavbar';
import Topbar from './Topbar';

export class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.removeLocations = this.removeLocations.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.viewLocation = this.viewLocation.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
    this.changeSortEvent = this.changeSortEvent.bind(this);
    this.sortFunc = this.sortFunc.bind(this);
    this.filter = this.filter.bind(this);
    this.handleGoogleMaps = this.handleGoogleMaps.bind(this);
  }
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
    selectedRows: [],
  };

  onRowSelection(selectedRows) {
    if (selectedRows.length === 0 && !this.allowUncheckAll) { // due to a bug in material-ui
      setTimeout(() => { this.setState({ selectedRows: this.state.selectedRows }); }, 100);
      return;
    }
    const modifiedArray = this.filter(Object.keys(this.props.locations.list)).sort(this.sortFunc);
    const modifiedSelectedRows = selectedRows.map((id) => modifiedArray[id]);
    this.setState({ selectedRows: modifiedSelectedRows });
    this.allowUncheckAll = false;
    if ('vibrate' in navigator) {
      navigator.vibrate([500]);
    }
  }
  allowUncheckAll = false;
  removeLocations() {
    this.props.removeLocations(this.state.selectedRows);
    this.uncheckAll();
  }
  uncheckAll() {
    this.allowUncheckAll = true;
    this.setState({ selectedRows: [] });
  }
  addLocation() {
    this.props.history.push('/locations/add');
  }
  editLocation() {
    if (this.state.selectedRows.length !== 0) {
      this.props.history.push(`/locations/edit/${this.state.selectedRows[0]}`);
    }
  }
  viewLocation() {
    if (this.state.selectedRows.length !== 0) {
      this.props.history.push(`/locations/view/${this.state.selectedRows[0]}`);
    }
  }
  changeSortEvent(categoryId) { // -1 = alphabeta
    this.props.changeSort(categoryId);
  }
  sortFunc(a, b) {
    const sortMethod = this.props.locations.sort;
    const locationA = this.props.locations.list[a];
    const locationB = this.props.locations.list[b];
    switch (sortMethod) {
      case -1: // alphabet
        return locationA.name.toLowerCase() > locationB.name.toLowerCase();
      case -2: // by group
        return locationA.category_id > locationB.category_id;
      default:
        return locationA.name.toLowerCase() > locationB.name.toLowerCase();
    }
  }
  filter(arr) {
    const sortMethod = this.props.locations.sort;
    if (sortMethod < 0) return arr;
    const result = [];
    arr.forEach((locId) => {
      const loc = this.props.locations.list[locId];
      if (String(loc.category_id) === sortMethod) {
        result.push(locId);
      }
    });
    return result;
  }
  handleGoogleMaps() {
    if (this.state.selectedRows.length !== 0) {
      const loc = this.props.locations.list[this.state.selectedRows[0]];
      window.open(`https://www.google.com/maps/?q=${loc.lat},${loc.lon}`);
    }
  }

  render() {
    return (
      <div>
        <h2>Locations</h2>
        <Topbar handleGoogleMaps={this.handleGoogleMaps} extraSort changeSortEvent={this.changeSortEvent} categories={this.props.categories} removeDisabled={!this.state.selectedRows.length} viewAction={this.viewLocation} editAction={this.editLocation} addAction={this.addLocation} removeAction={this.removeLocations} uncheckAll={this.uncheckAll} />
        <div>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={this.onRowSelection}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn tooltip="Location Id">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Address">Address</TableHeaderColumn>
                <TableHeaderColumn tooltip="Lat">Lat</TableHeaderColumn>
                <TableHeaderColumn tooltip="Lon">Lon</TableHeaderColumn>
                <TableHeaderColumn tooltip="Category">Category</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.filter(Object.keys(this.props.locations.list)).sort(this.sortFunc).map((id) => (
                <TableRow
                  key={id}
                  selected={this.state.selectedRows.indexOf(id) !== -1}
                >
                  <TableRowColumn>{id}</TableRowColumn>
                  <TableRowColumn>{this.props.locations.list[id].name}</TableRowColumn>
                  <TableRowColumn>{this.props.locations.list[id].address}</TableRowColumn>
                  <TableRowColumn>{this.props.locations.list[id].lat}</TableRowColumn>
                  <TableRowColumn>{this.props.locations.list[id].lon}</TableRowColumn>
                  <TableRowColumn>{this.props.categories.list[this.props.locations.list[id].category_id].name}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn colSpan="2" style={{ textAlign: 'center' }}>
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <BottomNavbar {...{ snackbarMsg: this.props.snackbarMsg, closeSnackbar: this.props.closeSnackbar }} />
      </div>);
  }
}

export default withRouter(Locations);
