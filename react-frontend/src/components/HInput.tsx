import React, { ChangeEvent, ReactNode } from "react";

import "../style/h-input.less";
import { HFieldInfo } from "./HForm";

export class HInput extends React.Component<{
    label: string,
    type?: string,
    required?: boolean,
    defaultValue?: string,
    fieldInfo: HFieldInfo
}> {
    valueChanged = (e: ChangeEvent): void => {
        this.props.fieldInfo.changeHandler((e.target as HTMLInputElement).value);
    }

    render(): ReactNode
    {
        return (
            <div className={ "h-input-container" }>
                <input onChange={ this.valueChanged } defaultValue={ this.props.defaultValue } className={ "h-input" } placeholder={ " " } required={ this.props.required || false } type={ this.props.type || "text" } name={ this.props.fieldInfo.fieldName } />
                <span className={ "h-input-placeholder" }>{ this.props.label }</span>
            </div>
        );
    }
}