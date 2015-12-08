export const BLUE = '#7AA5D6';
export const GREEN = '#73D7B9';
export const DARK_GREEN = '#4CBD9B'

export const smallType = {
  color: 'white',
  fontSize: '18px'
}

export const mediumType = {
  width: '250px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: 'white',
  fontSize: '24px'
}

export const CONTAINER_BASE = {
  paddingTop: '55px',
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  backgroundColor: BLUE
}

export const input = {
  backgroundColor: BLUE,
  borderTopStyle: 'none',
  borderRightStyle: 'none',
  borderLeftStyle: 'none',
  borderBottomStyle: 'solid',
  borderBottomColor: 'white',
  fontSize: '24px',
  color: 'white',
  ':focus': {
    outline: 0
  }
}

export const button = {
  marginTop: '20px',
  width: '250px',
  height: '50px',
  color: 'white',
  ':focus': {
    outline: 0
  }
}

export const primaryButton = {
  backgroundColor: GREEN,
  borderTopStyle: 'none',
  borderRightStyle: 'none',
  borderLeftStyle: 'none',
  borderBottomStyle: 'solid',
  borderBottomColor: DARK_GREEN,
  borderBottomWidth: '3px',
  ':active': {
    backgroundColor: DARK_GREEN,
    border: 'none'
  }
}

export const secondaryButton = {
  backgroundColor: BLUE,
  border: 'none'
}
