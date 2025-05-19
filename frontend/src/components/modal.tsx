import { View, Modal as ModalComponent, ModalProps, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

type Props = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

const Modal = ({isOpen, withInput, children, ...rest}: Props) => {
    const content  = withInput ? (
        <KeyboardAvoidingView 
        className='items-center justify-center flex-1 px-3 bg-zinc-900/40'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
           {children}
        </KeyboardAvoidingView>
    ) : 
    (
        <View className='items-center justify-center flex-1 px-3 bg-zinc-900/40'>
            {children}
        </View>
    )
  return (
     <ModalComponent
        className='bg-black'
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent={true}
        {...rest}
     >
        {content}
     </ModalComponent>
  )
}

export default Modal