import {Alert, Platform} from 'react-native';

//third Party Package
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import {localize} from '@languages';

const allPermission =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.CONTACTS]
    : [PERMISSIONS.ANDROID.WRITE_CONTACTS, PERMISSIONS.ANDROID.READ_CONTACTS];

class PermissionManager {
  requestContactAccess() {
    return new Promise((resolve, reject) => {
      checkMultiple(allPermission)
        .then(check_multi => {
          for (var index in check_multi) {
            if (check_multi[index] == RESULTS.GRANTED) {
              resolve();
            } else if (check_multi[index] === RESULTS.DENIED) {
              requestMultiple(allPermission).then(request_multi => {
                for (var value in request_multi) {
                  if (request_multi[value] === RESULTS.GRANTED) {
                    resolve();
                  } else if (request_multi[value] === RESULTS.BLOCKED) {
                    this.openSetting();
                    break;
                  }
                }
              });
            } else if (check_multi[index] == RESULTS.BLOCKED) {
              this.openSetting();
              break;
            }
          }
        })
        .catch(e => reject(e));
    });
  }

  openSetting() {
    Alert.alert(localize('permission_denied'), localize('setting_message'), [
      {
        text: localize('cancel'),
      },
      {
        text: localize('go_settings'),
        onPress: () => openSettings(),
      },
    ]);
  }
}

const Permission = new PermissionManager();
export {Permission};
