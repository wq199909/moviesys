import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface';
import { IResponseData, IResponseError } from '../services/CommonTypes';

interface IImgUploadProps {
    value?: string,
    onChange?: (imgUrl: string) => void
}
interface IImgModal {
    showModal: boolean
}

export default class extends Component<IImgUploadProps> {
    state: IImgModal = {
        showModal: false
    }
    private getUploadContent() {
        if (this.props.value) {
            return null
        }
        else {
            return <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传</div>
            </div>
        }
    }
    private getFileList(): UploadFile[] {
        if (this.props.value) {
            return [{
                uid: this.props.value,
                name: this.props.value,
                url: this.props.value
            }]
        } else {
            return []
        }
    }
    private async handleRequest(p: any) {
        let formData = new FormData();
        formData.append(p.filename, p.file);
        const request = new Request(p.action, {
            method: "post",
            body: formData
        })
        const resp: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json());
        if (resp.err) {
            message.error("上传失败");
        } else {
            if (this.props.onChange) {
                this.props.onChange(resp.data!);
            }
        }
    }
    render() {
        return (
            <div>
                <Upload
                    action="/api/upload"
                    name="imgfile"
                    accept=".jpg,.png,.jif"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest.bind(this)}
                    onRemove={() => {
                        if (this.props.onChange) {
                            this.props.onChange("");
                        }
                    }}
                    onPreview={() => {
                        this.setState({
                            showModal: true
                        })
                    }}
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal visible={this.state.showModal} footer={null} onCancel={() => {
                    this.setState({
                        showModal: false
                    })
                }}>
                    <img src={this.props.value} style={{ width: '100%' }} alt="" />
                </Modal>
            </div>
        )
    }
}
