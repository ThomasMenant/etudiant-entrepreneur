import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import {regions, pepites, establishments} from './pepiteEstablishmentMap'

function getPepiteFromEstablishment(establishmentId) {
  return ({
    'id': establishments[establishmentId].pepite ,
    'name': pepites[establishments[establishmentId].pepite]
  })
}

function getAllValidPepites(regionId, establishmentId) {
  if (establishmentId >= 0) {
    return ([getPepiteFromEstablishment(establishmentId)])
  }
  if (regionId >= 0) {
    return deleteDuplicate((regions[regionId].establishments.map(getPepiteFromEstablishment)))
  }
  return []
}

function deleteDuplicate(array) {
  return array.filter(function(item, pos) {
    return array.findIndex(i => i.id == item.id) == pos
  })
}

function isOverduePepite(idPepite) {
  return (false)
}

const PepiteForm = ({pepite, contact, errors, onChange}) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Ma région</ControlLabel>
        <ValidatedFormControl name="region" componentClass="select" onChange={onChange} value={pepite.region} error={errors.region}>
          <option value="0" disabled>Sélectionner</option>
          {regions.map((region, index) => { return (<option key={index + 1} value={index + 1}>{region.name}</option>) }) }
        </ValidatedFormControl>
      </FormGroup>
      {(() => {
        if (pepite.region != 0) {
          return(
            <FormGroup className={(contact.situation == 'graduate') ? 'hidden' : ''}>
              <ControlLabel>Mon établissement pour l'année 2016</ControlLabel>
              <ValidatedFormControl name="establishment" componentClass="select" onChange={onChange} value={pepite.establishment}>
                <option value="0" disabled>Sélectionner</option>
                {regions[pepite.region - 1].establishments.map((eid) => { return (<option key={eid + 1} value={eid + 1}>{establishments[eid].name}</option>) }) }
              </ValidatedFormControl>
            </FormGroup>
          )
        }})()}
      {(() => {
        if (pepite.region != 0) {
          return(
            <FormGroup className="required">
              <ControlLabel>Mon PEPITE</ControlLabel>
              <ValidatedFormControl name="pepite" componentClass="select" onChange={onChange} value={pepite.pepite} error={errors.pepite}>
                <option value="0" disabled>Sélectionner</option>
                {getAllValidPepites(pepite.region - 1, pepite.establishment - 1).map((pepite, index) => { return (<option key={index + 1} value={pepite.id + 1}>PEPITE {pepite.name}</option>) }) }
              </ValidatedFormControl>
            </FormGroup>
            )
        }})()}
        <FormGroup className="required">
          <ControlLabel>Je demande un accès à l'espace de coworking PEPITE (selon disponibilité)</ControlLabel>
          <RadioGroup name="askCoworking" onChange={onChange} selectedValue={pepite.askCoworking} error={errors.askCoworking}>
            <Radio value="true">oui</Radio>
            <Radio value="false">non</Radio>
          </RadioGroup>
        </FormGroup>
    </form>
  )
}

PepiteForm.propTypes = {
  pepite: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default PepiteForm
