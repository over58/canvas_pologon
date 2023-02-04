import React from "react";
import {
  FormItem,
  Input,
  Select,
  Checkbox,
  NumberPicker,
  Radio,
  FormGrid,
  Space
} from "@formily/antd";
import type { ISchemaFieldProps } from "@formily/react";
import { createForm } from "./utils";
import { Category } from "./components/Category";

const DemoPropertiesFormConfig: ISchemaFieldProps & {
  hasConsumer?: boolean;
} = {
  hasConsumer: true,
  scope: {},
  components: {
    FormItem,
    Input,
    Space,
    Select,
    Radio,
    Category
  },
  schema: {
    type: "object",
    properties: {
      name: {
        title: "姓名",
        type: "string",
        "x-decorator": "FormItem",
        "x-component": "Input"
      },
      sex: {
        title: "性别",
        type: "string",
        "x-decorator": "FormItem",
        "x-component": "Radio.Group",
        enum: [
          { label: "女", value: "women" },
          { label: "男", value: "man" }
        ]
      },
      space: {
        type: "void",
        "x-component": "Space",
        "x-component-props": {
          direction: "horizontal"
        },
        properties: {
          filters: {
            type: "object",
            "x-decorator": "FormItem",
            "x-component": "Category",
            "x-component-props": {},
            properties: {
              a: {
                type: "string",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "请输入分类",
                  allowClear: true,
                  showSearch: true,
                  filterOption: false,
                  style: {
                    width: 150
                  }
                },
                enum: []
              },
              b: {
                type: "string",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "请输入分类",
                  allowClear: true,
                  showSearch: true,
                  filterOption: false,
                  style: {
                    width: 150
                  }
                },
                enum: []
              }
            }
          }
        }
      }
    }
  }
};

export const DemoPropertiesForm = createForm(DemoPropertiesFormConfig);
