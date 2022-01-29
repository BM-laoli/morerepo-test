import React, { useEffect, useState } from 'react';
import { intersection, T, type } from 'ramda';
import QiankunStore from '@/shared/store/qiankun.store';

interface InterAclProps<T, U> {
  current?: Array<string> | U | string; // 当前的组件式那个
  auth?: (missList: Array<string> | T, current: Array<string> | U) => boolean;
  message?: string;
  except?: boolean;
  children: React.ReactNode;
}

// 默认cb不传递
const access = (roleKey: string, cb: (missList: any) => boolean): boolean => {
  let isRol = false;
  if (cb && cb(QiankunStore.accessList)) {
    isRol = true;
  } else {
    // @ts-ignore
    if (QiankunStore.accessList.find((item) => item === roleKey)) {
      isRol = true;
    }
  }

  return isRol;
};

const AccessControlList = <T, U>(props: InterAclProps<T, U>) => {
  // 加载默认的 当前的用户的权限List （current）和当前的组件的list
  const { current, auth, except } = props;
  const [visible, setVisible] = useState(false);
  const { accessList } = QiankunStore;

  const defaultAuth = () => {
    if (!Array.isArray(accessList)) {
      return;
    }
    // @ts-ignore
    if (intersection(accessList, current).length || accessList.some((item) => item === current)) {
      setVisible(true);
      return;
    }
    setVisible(false);
  };

  const authWithCb = () => {
    if (!auth || !current) {
      return;
    }
    // @ts-ignore
    if (auth(accessList, current)) {
      setVisible(true);
      return;
    }
    setVisible(false);
  };

  const entry = () => {
    defaultAuth();
    authWithCb();
  };

  useEffect(() => {
    entry();
  }, []);

  const isNone = () => {
    if (except) {
      return !visible ? 'unset' : 'none';
    }
    return visible ? 'unset' : 'none';
  };
  return <div style={{ display: isNone() }}> {props.children} </div>;
};

export { access };
export default AccessControlList;
