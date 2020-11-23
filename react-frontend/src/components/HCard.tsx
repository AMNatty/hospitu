import React, { ReactNode } from "react";
import "../style/h-card.less";

export class HCard extends React.Component {
    render(): ReactNode
    {
        return (
            <div className={ "h-card" }>
                { this.props.children }
            </div>
        );
    }
}