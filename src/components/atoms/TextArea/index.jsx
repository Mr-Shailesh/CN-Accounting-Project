import { Input, Form } from "antd";
import classes from "./styles.module.scss";
const { TextArea } = Input;
const Textarea = (props) => {
  const { name, rules, className, ...rest } = props;
  return (
    <Form.Item name={name} rules={rules} className={className}>
      <TextArea name={name} rows={4} {...rest} className={classes.textArea} />
    </Form.Item>
  );
};

export default Textarea;
