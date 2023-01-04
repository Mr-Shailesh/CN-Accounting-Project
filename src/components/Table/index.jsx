import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Style from "./table.module.scss";
import cs from "classnames";

const CustomTable = ({
  className,
  data,
  columns,
  loading,
  size = "large",
  rowClassName,
  bordered,
  editAction,
  deleteAction,
  ...res
}) => {
  const [editColumns, setEditColumns] = useState([...columns]);
  const editDelete = {
    title: "Actions",
    dataIndex: "status",
    width: 200,
    render: (_, record) => {
      return (
        <div className="d-flex">
          {deleteAction && (
            <Tooltip placement="topLeft" title={"Delete"}>
              <div
                className={cs(Style.btn, Style.deleteBtn)}
                onClick={() => {
                  deleteAction(record?.uniqueKey);
                }}
              >
                <DeleteOutlined className="px-5" />
              </div>
            </Tooltip>
          )}
          {editAction && (
            <Tooltip
              placement="topLeft"
              title={"Edit"}
              onClick={() => {
                editAction(record);
              }}
            >
              <div className={cs(Style.btn, Style.editBtn)}>
                <EditOutlined className="px-5" />
              </div>
            </Tooltip>
          )}
        </div>
      );
    },
  };

  useEffect(() => {
    if (editAction || deleteAction) {
      setEditColumns([...columns, editDelete]);
    }
  }, [deleteAction, editAction]);

  return (
    <>
      <div className={className}>
        <Table
          dataSource={data}
          columns={editColumns}
          loading={loading}
          size={size}
          rowClassName={rowClassName}
          bordered={bordered}
          pagination={true}
          {...res}
        />
      </div>
    </>
  );
};

export default CustomTable;
