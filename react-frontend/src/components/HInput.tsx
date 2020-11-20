import React from "react";

import "../style/h-input.less";

export class HInput extends React.Component<{
    label: string,
    type?: string,
    name?: string
}> {
    render(): JSX.Element
    {
        return (
            <div className={ "h-input-container" }>
                <input className={ "h-input" } placeholder={ " " } type={ this.props.type || "text" } name={ this.props.name } />
                <span className={ "h-input-placeholder" }>{ this.props.label }</span>
            </div>
        );
    }
}