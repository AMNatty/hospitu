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

export class HSubHeader extends React.Component {
    render(): ReactNode
    {
        return (
            <div className={ "h-sub-header" }>
                { this.props.children }
            </div>
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

export class HGrid extends React.Component<{
    shrink?: boolean
}> {
    render(): ReactNode
    {
        return (
            <div className={ "h-grid " + (this.props.shrink ? "h-grid-shrink" : "") }>
                { this.props.children }
            </div>
        );
    }
}

export class HGridSpan extends  React.Component<{
    gridColumnStart?: string,
    gridColumnEnd?: string,
    gridRowStart?: string,
    gridRowEnd?: string
}> {
    render(): ReactNode
    {
        return (
            <div style={{
                gridColumnStart: this.props.gridColumnStart,
                gridColumnEnd: this.props.gridColumnEnd,
                gridRowStart: this.props.gridRowStart,
                gridRowEnd: this.props.gridRowEnd
            }}>
                { this.props.children }
            </div>
        );
    }
}