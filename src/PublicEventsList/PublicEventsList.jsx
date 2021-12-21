import React from 'react';
import publicEvents from "../_helpers";
import { userService, authenticationService } from '../_services';
const data = require('../_helpers/fake-database')
import {reactScrollCollapse} from 'react-scroll-collapse';
import Scroller from 'react-scroll-collapse';
import Collapse from 'react-collapse';
import {collapserControllerItem} from 'react-scroll-collapse';
import ReactScrollableList from 'react-scrollable-list'

class PublicEventsList extends React.Component {
    constructor(props) {
        super(props);

    }  

    

    render() {
        const {isOpened, onHeightReady, expandCollapse} = this.props;
        console.log(data)
        let listItems = []
            for (let i = 0; i < 100; i++) {
            listItems.push({ id: i, content: i })
        }

        return (
            <div
            onClick={expandCollapse} // use expandCollapse as an event callback.
            ref={collapserItemRef} // pass the supplied ref or auto scroll won't work.
            >
            <ReactScrollableList
                listItems={listItems}
                heightOfItem={30}
                maxItemsToRender={20}
                style={{ color: '#333' }}
            />
            </div>
        );
    }
}

export { PublicEventsList };