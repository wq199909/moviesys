import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IMovie } from '../services/MovieSerivice';
import ImgUploader from './ImgUploader';
import { RouteComponentProps, withRouter } from 'react-router';

interface IFormProps extends RouteComponentProps {
    movie?: IMovie,
    form: WrappedFormUtils<any>,
    onSubmit: (movie: IMovie)=>Promise<string>
}

const tailFormItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    },
};

const areaOptions: { label: string, value: string }[] = [
    { label: "中国大陆", value: "中国大陆" },
    { label: "美国", value: "美国" },
    { label: "中国台湾", value: "中国台湾" },
    { label: "中国香港", value: "中国香港" }
]

const typeOptions: { label: string, value: string }[] = [
    { label: "喜剧", value: "喜剧" },
    { label: "动作片", value: "动作片" },
    { label: "动漫", value: "动漫" },
    { label: "爱情", value: "爱情" }
]
class MovieForm extends Component<IFormProps> {

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.form.validateFields(async errors => {
            if (!errors) {
                const formData = this.props.form.getFieldsValue();
                const result = await this.props.onSubmit(formData as IMovie);
                if(result){
                    message.error(result)
                }else{
                    message.success("处理成功", 1, ()=>{
                        this.props.history.push("/movie")
                    })
                }
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} {...tailFormItemLayout} style={{ width: "400px" }}>
                <Form.Item label="电影名称">
                    {getFieldDecorator<IMovie>("name", {
                        rules: [{ required: true, message: "请填写电影名称" }]
                    })(<Input></Input>)}
                </Form.Item>
                <Form.Item
                    label="封面图"
                >
                    {getFieldDecorator<IMovie>("poster")(
                        <ImgUploader></ImgUploader>
                    )}
                </Form.Item>
                <Form.Item
                    label="上映地区"
                >
                    {getFieldDecorator<IMovie>("areas", {
                        rules: [{ required: true, message: "请选择地区" }]
                    })(
                        <Checkbox.Group options={areaOptions}></Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item
                    label="电影类型"
                >
                    {getFieldDecorator<IMovie>("types", {
                        rules: [{ required: true, message: "请选择类型" }]
                    })(
                        <Checkbox.Group options={typeOptions}></Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item
                    label="时长(分钟)"
                >
                    {getFieldDecorator<IMovie>("timeLong", {
                        rules: [{ required: true, message: "请填写时长" }]
                    })(
                        <InputNumber min={1} step={10} />
                    )}
                </Form.Item>
                <Form.Item
                    label="正在热映"
                >
                    {getFieldDecorator<IMovie>("isHot", {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="即将上映"
                >
                {getFieldDecorator<IMovie>("isComing", {
                    valuePropName: 'checked',
                    initialValue: false
                })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="经典影片"
                >
                    {getFieldDecorator<IMovie>("isClassic", {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    label="描述"
                >
                    {getFieldDecorator<IMovie>("description")(
                        <Input.TextArea />
                    )}
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 0 }}
                    wrapperCol={{ offset: 6 }}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        )
    }
}
type MovieFields = {
    [k in Exclude<keyof IMovie, "_id">]: any
}
interface IMovieKey extends IMovie{
    [key: string]: any
}
function getDefaultField(movie:IMovieKey):MovieFields{
    const obj: any = {};
    for (const key in movie) {
        obj[key] = Form.createFormField({
            value: movie[key] as any
        })
    }
    console.log(obj)
    return obj;
}

export default withRouter(Form.create<IFormProps>({
    mapPropsToFields: props=>{
        if(props.movie){
            return getDefaultField(props.movie)
        }
    }
})(MovieForm));