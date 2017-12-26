import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconPlace from 'material-ui/svg-icons/maps/edit-location';

class Topbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }
  state = {
    removeWarningDialogOpen: false,
    sortMethod: -1,
  }

  handleRemoveDialogOpen = () => {
    if (!this.props.removeDisabled) {
      this.setState({ removeWarningDialogOpen: true });
    }
  };

  handleRemoveDialogClose = () => {
    this.setState({ removeWarningDialogOpen: false });
  };

  handleChangeSort(e, k, v) {
    this.setState({ sortMethod: v });
    if (this.props.changeSortEvent) {
      this.props.changeSortEvent(v);
    }
  }

  removeWarningDialogActions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={this.handleRemoveDialogClose}
    />,
    <FlatButton
      label="Remove"
      primary
      keyboardFocused
      onClick={() => { this.props.removeAction(); this.handleRemoveDialogClose(); }}
    />,
  ];

  iconStyle = { margin: '20px' }

  render = () =>
    (<div>
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label="Uncheck" onClick={this.props.uncheckAll} />
          {this.props.extraSort ? (
            <SelectField onChange={this.handleChangeSort} underlineStyle={{ display: 'none' }} value={this.state.sortMethod} style={{ width: '120px', height: '30px', backgroundColor: '#fff' }} menuStyle={{ position: 'relative', top: '-8px', marginLeft: '5px' }} >
              <MenuItem value={-1} primaryText="Alphabet" />
              <MenuItem value={-2} primaryText="Grouped" />
              {
                Object.keys(this.props.categories.list).map((id) =>
                  <MenuItem key={id} value={id} primaryText={this.props.categories.list[id].name} />)
              }
            </SelectField>
          ) : null}
          <ToolbarSeparator />
          <RaisedButton style={this.iconStyle} label="View" primary onClick={this.props.viewAction} />
          <RaisedButton style={this.iconStyle} label="Add" primary onClick={this.props.addAction} />
          <RaisedButton style={this.iconStyle} label="Remove" primary onClick={this.handleRemoveDialogOpen} />
          <RaisedButton style={this.iconStyle} label="Edit" primary onClick={this.props.editAction} />
          {this.props.handleGoogleMaps ? (
            <IconButton onClick={this.props.handleGoogleMaps} style={{ marginRight: '20px' }} tooltip="Show in google maps">
              <IconPlace />
            </IconButton>) : null}
        </ToolbarGroup>
      </Toolbar>
      <Dialog
        title="Remove items"
        actions={this.removeWarningDialogActions}
        modal={false}
        open={this.state.removeWarningDialogOpen}
        onRequestClose={this.handleRemoveDialogClose}
      >
        Are you sure you want to remove the selected items?
      </Dialog>
    </div>)
}
export default Topbar;
