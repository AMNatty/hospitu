import React from "react";
import "../style/h-card.less";

export class HCard extends React.Component {
    render(): JSX.Element
    {
        return (
            <div className={ "h-card" }>
                { this.props.children }
            </div>
        );
    }
}