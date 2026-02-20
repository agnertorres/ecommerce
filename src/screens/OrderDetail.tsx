import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../types';

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Handbag } from 'lucide-react-native';

import OrderDetail from '../components/Order/OrderDetail';

import { getOrderById } from '../services/order';

type OrderDetailProps = NativeStackScreenProps<OrderStackParamList, 'OrderDetail'>;

export default function OrderDetailScreen({ route }: OrderDetailProps) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = route.params;

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        const { data }: any = await getOrderById(Number(id));
        setOrder(data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#7b7b7b" />
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Handbag size={30} strokeWidth={1} color={'#333'} />
        <Text style={{ textAlign: 'center', marginTop: 10, color: '#333' }}>{error}</Text>
      </View>
    );
  }

  return (
    <OrderDetail order={order} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});