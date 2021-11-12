import React from "react";
import { Rate } from "antd";
type RateType = React.ComponentProps<typeof Rate>;
interface PinProps extends RateType {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
// 星星 收藏功能
const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProp } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(c) => onCheckedChange?.(!!c)}
      {...restProp}
    />
  );
};

export default Pin;
