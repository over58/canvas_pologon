import React from "react";
import { Input, FormItem, FormButtonGroup, Submit } from "@formily/antd";
import { createForm } from "@formily/core";
import { FormProvider, Field } from "@formily/react";
import { DemoPropertiesForm } from "./forms";

const form = createForm({
  initialValues: {
    filters: {}
  }
});

export default () => {
  return <div></div>;
};
