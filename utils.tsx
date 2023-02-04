import { Form } from "@formily/antd";
import {
  createSchemaField,
  FormConsumer,
  ISchemaFieldProps
} from "@formily/react";
import React from "react";
export function createForm(
  config: ISchemaFieldProps & {
    hasConsumer?: boolean;
  }
) {
  const { components, scope, schema, hasConsumer } = config;

  const SchemaField = createSchemaField({});

  // eslint-disable-next-line react/display-name
  return React.forwardRef((props: any, ref: any) => {
    const { layout, form, formStep, ...rest } = props;
    return (
      <Form form={form} layout={layout} {...rest}>
        <SchemaField
          components={components}
          scope={{ ...scope, formStep }}
          schema={schema}
        />
        {hasConsumer ? (
          <FormConsumer>{props.children}</FormConsumer>
        ) : (
          props.children
        )}
      </Form>
    );
  });
}
