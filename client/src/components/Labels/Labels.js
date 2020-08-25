import React, { useState, useEffect } from 'react';
import './Labels.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Labels = ({ labels }) => {
  if (!labels) {
    return null;
  }
  return (
    <div className="labelsContainer">
      <div className="labels">
        {
            labels.map((label, i) => (
              <div className="label" key={i}>
                <div className="label" color="primary">{label}</div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Labels;
