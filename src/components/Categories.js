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

export class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.onRowSelection = this.onRowSelection.bind(this);
    this.removeCategories = this.removeCategories.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.viewCategory = this.viewCategory.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
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
    this.setState({ selectedRows });
    this.allowUncheckAll = false;
  }
  allowUncheckAll = false;
  removeCategories() {
    this.props.removeCategories(this.state.selectedRows);
    this.uncheckAll();
  }
  uncheckAll() {
    this.allowUncheckAll = true;
    this.setState({ selectedRows: [] });
  }
  addCategory() {
    this.props.history.push('/categories/add');
  }
  editCategory() {
    if (this.state.selectedRows.length !== 0) {
      this.props.history.push(`/categories/edit/${Object.keys(this.props.categories.list)[this.state.selectedRows[0]]}`);
    }
  }
  viewCategory() {
    if (this.state.selectedRows.length !== 0) {
      this.props.history.push(`/categories/view/${Object.keys(this.props.categories.list)[this.state.selectedRows[0]]}`);
    }
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <Topbar removeDisabled={!this.state.selectedRows.length} viewAction={this.viewCategory} editAction={this.editCategory} addAction={this.addCategory} removeAction={this.removeCategories} uncheckAll={this.uncheckAll} />
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
                <TableHeaderColumn tooltip="Category Id">ID</TableHeaderColumn>
                <TableHeaderColumn tooltip="Category Name">Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {Object.keys(this.props.categories.list).map((id, index) => (
                <TableRow
                  key={id}
                  selected={this.state.selectedRows.indexOf(index) !== -1}
                >
                  <TableRowColumn>{id}</TableRowColumn>
                  <TableRowColumn>{this.props.categories.list[id].name}</TableRowColumn>
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

export default withRouter(Categories);
