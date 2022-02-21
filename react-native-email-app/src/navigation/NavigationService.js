import * as React from 'react';
// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

const reset = (name, params) => {
  if (navigationRef.current) {
    return navigationRef.current.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  } else {
    console.log('!!!!not mounted yet!!!!!!!');
  }
};

export default {
  navigate,
  goBack,
  reset,
};
