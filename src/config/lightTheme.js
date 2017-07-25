import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {blue600} from 'material-ui/styles/colors';


const theme = {
  ...lightBaseTheme,
  palette: {
    ...lightBaseTheme.palette,
    primary1Color: blue600,
  }
}

export default theme;
