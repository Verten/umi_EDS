import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from '../components/text-field/Input'
import Textarea from '../components/text-field/Textarea'
import Theme from '../components/theme'

const title = 'Text fields'

class ControlledInput extends Component {
  state = { val: '' }
  changeHandler = e => {
    const val = e.target.value
    this.setState({ val })
  }
  render() {
    return (
      <Theme>
        <h3>default</h3>
        <Input value={this.state.val} onChange={this.changeHandler} />
        <h3>fullwidth</h3>
        <Input inputType={'fullwidth'} value={this.state.val} onChange={this.changeHandler} />
      </Theme>
    )
  }
}

function LabelInput() {
  const labelTop = { pos: 'left', text: 'Label' }
  const labelLeft = { text: 'Label' }
  return (
    <Theme>
      <Input label={labelTop} />
      <Input label={labelLeft} />
    </Theme>
  )
}

function PrefixInput() {
  return (
    <Theme>
      <Input prefix={'$'} />
      <Input prefix icon="icon-search" />
    </Theme>
  )
}

function SuffixInput() {
  return (
    <Theme>
      <Input suffix={'suffix'} />
      <Input suffix icon="icon-search" />
    </Theme>
  )
}

function TextareaDemo() {
  return (
    <Theme>
      <Textarea />
    </Theme>
  )
}

function InputEnter() {
  return (
    <Input onEnter={action('enter')} />
  )
}

storiesOf(title, module)
  .add('default', () => <ControlledInput />)
  .add('input with label', () => <LabelInput />)
  .add('input with prefix', () => <PrefixInput />)
  .add('input with suffix', () => <SuffixInput />)
  .add('input enter', () => <InputEnter />)
  .add('textarea', () => <TextareaDemo />)