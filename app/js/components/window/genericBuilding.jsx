'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');

var GenericBuildingStore = require('js/stores/genericBuilding');

var StandardTabs = require('js/components/window/building/standardTabs');
var BuildingInformation = require('js/components/window/building/information');

var { Tabs } = require('js/components/tabber');

var GenericBuilding = createReactClass({
    displayName: 'GenericBuilding',

    statics: {
        options: {
            title: 'Generic Building',
            width: 700,
            height: 420,
        },
    },

    propTypes: {
        options: PropTypes.object,
    },

    // mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        GenericBuildingRPCActions.requestGenericBuildingRPCView(
            this.props.options.url,
            this.props.options.id
        );
    },

    componentWillReceiveProps: function() {
        BuildingWindowActions.buildingWindowClear();
        GenericBuildingRPCActions.requestGenericBuildingRPCView(
            this.props.options.url,
            this.props.options.id
        );
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('building');
    },

    render: function() {
        var building = this.state.genericBuildingStore;
        var tabs = StandardTabs.tabs(this.props.options, building);

        return (
            <div>
                <BuildingInformation options={this.props.options} />
                <div>
                    <Tabs>{tabs}</Tabs>
                </div>
            </div>
        );
    },
});

module.exports = GenericBuilding;
