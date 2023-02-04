import React, { useCallback, useEffect, useState } from "react";
import { Form, Select, Button, Table } from "antd";
import { useRequest } from "ahooks";
import { useFormEffects } from "@formily/react";
import { onFieldInit, onFieldValueChange } from "@formily/core";
const { Item: FormItem } = Form;

const asyncFetchData = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          uuid: "aaa",
          name: "Tom",
          sex: "man"
        },
        {
          uuid: "bbb",
          name: "Marry",
          sex: "woman"
        }
      ]);
    }, 1000);
  });
};

interface CategoryProps {
  children?: React.ReactNode;
  value: string;
}
export const Category: React.FC<CategoryProps> = ({ value, children }) => {
  const [formRef] = Form.useForm();

  // useEffectForm 其实是 EffectContext 的便利用法，因为大多数场景用户都会读取 Form 实例，所以就不需要手动定义一个 EffectFormContext
  useFormEffects((form) => {
    console.log("===form effects", form);
    onFieldValueChange("*(name,sex)", (field) => {
      const depValues = field.query("*(name,sex)").reduce((value, cur: any) => {
        if (cur.value !== undefined) {
          value[cur.props.name as string] = cur.value;
        }
        return value;
      }, {});
      console.log("==depValues", depValues);
    });
  });

  const [initialValues] = useState({
    filter1: "a1",
    filter2: "b1"
  });

  const { runAsync, loading, data } = useRequest(
    (values: any) => asyncFetchData({ ...values }),
    {
      manual: true
    }
  );

  const handleSubmit = useCallback(
    (values) => {
      console.log("===search values", values);
      runAsync(values);
    },
    [runAsync]
  );

  useEffect(() => {
    handleSubmit({
      ...initialValues
    });
  }, [handleSubmit, initialValues]);
  return (
    <div style={{ border: "solid 1px #333", width: 600, padding: 10 }}>
      <Form form={formRef} layout="inline" initialValues={initialValues}>
        <FormItem label="厂商" name="filter1">
          <Select
            style={{ width: 150 }}
            options={[
              {
                label: "A1",
                value: "a1"
              },
              {
                label: "A2",
                value: "a2"
              }
            ]}
          />
        </FormItem>
        <FormItem label="区域" name="filter2">
          <Select
            style={{ width: 150 }}
            options={[
              {
                label: "B1",
                value: "b1"
              },
              {
                label: "B2",
                value: "b2"
              }
            ]}
          />
        </FormItem>
        <FormItem>
          <Button
            onClick={(e) => {
              const values = formRef.getFieldsValue();
              handleSubmit(values);
            }}
          >
            Submit
          </Button>
        </FormItem>
      </Form>
      <Table
        loading={loading}
        columns={[
          {
            title: "Name",
            dataIndex: "name"
          },
          {
            title: "Sex",
            dataIndex: "sex"
          }
        ]}
        dataSource={data as any}
        rowKey="uuid"
      />
    </div>
  );
};
