import React, { ChangeEvent, ReactNode } from "react";

import "../style/h-input.less";
import { HFieldInfo } from "./HForm";

export class HInput extends React.Component<{
    label: string,
    type?: string,
    required?: boolean,
    readOnly?: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: string,
    fieldInfo: HFieldInfo
}, {
    defaultValue: string
}> {
    constructor(props: never)
    {
        super(props);

        this.state = {
            defaultValue: this.props.fieldInfo.fieldValue()
        };
    }

    valueChanged = (e: ChangeEvent): void => {
        this.props.fieldInfo.changeHandler((e.target as HTMLInputElement).value);
    }

    render(): ReactNode
    {
        const additionalClasses = this.props.required ? " h-input-required" : "";

        return (
            <div className={ "h-input-container" }>
                <input onChange={ this.valueChanged } pattern={ this.props.pattern } minLength={ this.props.minLength } maxLength={ this.props.maxLength } defaultValue={ this.state.defaultValue } readOnly={ this.props.readOnly ?? false } className={ "h-input" } placeholder={ " " } required={ this.props.required ?? false } type={ this.props.type ?? "text" } name={ this.props.fieldInfo.fieldName } />
                <span className={ "h-input-placeholder" + additionalClasses }>{ this.props.label }</span>
            </div>
        );
    }
}

export class HFlow extends React.Component<{
    right?: boolean
}> {
    render(): ReactNode
    {
        if (this.props.right)
            return (
                <div className={ "h-flow" }>
                    <div className={ "h-flow-filler" } />
                    { this.props.children }
                </div>
            );
        else
            return (
                <div className={ "h-flow" }>
                    { this.props.children }
                    <div className={ "h-flow-filler" } />
                </div>
            );
    }
}