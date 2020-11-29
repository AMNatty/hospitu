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

export class HHeader extends React.Component {
    render(): ReactNode
    {
        return (
            <header className={ "h-header" }>
                { this.props.children }
            </header>
        );
    }
}

export class HBox extends  React.Component {
    render(): ReactNode
    {
        return (
            <div className={ "h-hbox" }>
                { this.props.children }
            </div>
        );
    }
}

export class VBox extends  React.Component {
    render(): ReactNode
    {
        return (
            <div className={ "h-vbox" }>
                { this.props.children }
            </div>
        );
    }
}