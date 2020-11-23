import React, { ReactNode } from "react";

export interface HFieldInfo {
    fieldName: string,
    changeHandler: ((value: string) => void)
}

export class HFormComponent<P, S extends {
    fields: Record<string, string>
}> extends React.Component<P, S> {
    managedField = (field: keyof S["fields"]): HFieldInfo => {
        return {
            fieldName: "" + field,
            changeHandler: (value: string) => {
                this.setState(() => ({
                    fields: {
                        ...this.state.fields,
                        [field]: value
                    }
                }));
            }
        };
    }
}

export class HForm extends React.Component<{
    onSubmit: (() => void)
}> {
    render(): ReactNode
    {
        return (
            <form onSubmit={ event => { this.props.onSubmit(); event.preventDefault(); } }>
                { this.props.children }
                <input type={ "submit" } style={{ display: "none" }} />
            </form>
        );
    }
}