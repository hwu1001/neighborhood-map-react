import React from "react";
import PropTypes from "prop-types";

const styles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
    position: 'relative',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  header: {
    backgroundColor: "#03a9f4",
    color: "white",
    // padding: "16px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    fontSize: "1.5em"
  }
};

const TitleBar = props => {
  const rootStyle = props.style
    ? { ...styles.root, ...props.style }
    : styles.root;

  return (
    <div id='title-bar' style={rootStyle}>
      <div style={styles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};

TitleBar.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object
};

export default TitleBar;