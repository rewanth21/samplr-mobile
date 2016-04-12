export const BLUE = '#7AA5D6';
export const GREEN = '#73D7B9';
export const DARK_GREEN = '#4CBD9B'

export const smallType = {
  color: 'white',
  fontSize: '18px'
}

export const fontType ={
    color: 'white',
    position:'relative',   
    fontWeight:'bold'

    
  }

export const mediumType = {
  width: '250px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: 'white',
  fontSize: '24px'
}

export const largeType = {
  width: '250px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: 'white',
  fontSize: '30px'
}

export const CONTAINER_BASE = {
  paddingTop: '55px',
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  backgroundColor: BLUE,
  fontFamily: '"Helvetica", sans-serif'
}

export const innercontainer = {
   
   backgroundColor: BLUE,
   width: '10%',
   height: '16%',
   textAlign: 'left',
   fontFamily: '"Helvetica", sans-serif',
   marginLeft: 'auto',
   marginRight: 'auto'
   
}

export const input = {
  WebkitAppearance: 'none',
  WebkitBorderRadius: 0,
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

}

export const primaryButton = {
  '-webkit-appearance': 'none',
  '-webkit-border-radius': 0,
  marginTop: '20px',
  fontSize: '24px',
  width: '250px',
  height: '50px',
  color: 'white',
  ':focus': {
    outline: 0
  },
  backgroundColor: GREEN,
  borderTopStyle: 'none',
  borderRightStyle: 'none',
  borderLeftStyle: 'none',
  borderBottomStyle: 'solid',
  borderBottomColor: DARK_GREEN,
  borderBottomWidth: '3px',
  ':active': {
    backgroundColor: DARK_GREEN,
    borderBottom: 'none'
  }
}

export const secondaryButton = {
  marginTop: '20px',
  fontSize: '24px',
  width: '250px',
  height: '50px',
  color: 'white',
  ':focus': {
    outline: 0
  },
  backgroundColor: BLUE,
  border: 'none'
}
