import { useState, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  WashingMachine, 
  Waves, 
  Truck, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare,
  CheckCircle2,
  ShoppingCart,
  Trash2,
  ArrowRight
} from 'lucide-react';

interface SubService {
  name: string;
  price: number;
}

interface MainService {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  subServices: SubService[];
}

const SERVICES: MainService[] = [
  {
    id: 'full-laundry',
    title: 'Full Laundry',
    description: 'Washing, drying, folding',
    icon: <WashingMachine className="w-8 h-8" />,
    subServices: [
      { name: 'Shirts', price: 500 },
      { name: 'Trousers', price: 700 },
      { name: 'Native Wear', price: 1500 },
      { name: 'Bedsheets', price: 2000 },
      { name: 'Duvet', price: 3500 },
      { name: 'Towels', price: 400 },
    ]
  },
  {
    id: 'starching-ironing',
    title: 'Starching and Ironing',
    description: 'Premium starch treatment + ironing',
    icon: <Waves className="w-8 h-8" />,
    subServices: [
      { name: 'Shirt Starching', price: 600 },
      { name: 'Trouser Starching', price: 700 },
      { name: 'Native Wear Starching', price: 1800 },
      { name: 'Bedsheet Ironing', price: 1200 },
    ]
  },
  {
    id: 'ironing-only',
    title: 'Ironing Only',
    description: 'Professional ironing service',
    icon: <Waves className="w-8 h-8" />,
    subServices: [
      { name: 'Shirt Ironing', price: 300 },
      { name: 'Trouser Ironing', price: 400 },
      { name: 'Native Wear Ironing', price: 1000 },
      { name: 'Full Outfit Folding', price: 800 },
    ]
  }
];

const DELIVERY_OPTIONS = [
  { id: 'self', title: 'Self Pickup', price: 0, description: 'Drop off and pick up yourself' },
  { id: 'standard', title: 'Standard Delivery', price: 1000, description: 'Doorstep collection & delivery' },
  { id: 'express', title: 'Express Delivery', price: 2500, description: 'Faster processing and delivery' },
  { id: 'same-day', title: 'Same Day Delivery', price: 3500, description: 'Super fast turnaround' },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedMainServiceId, setSelectedMainServiceId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('self');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    date: '',
    notes: '',
    landmark: '',
  });

  const selectedMainService = useMemo(() => 
    SERVICES.find(s => s.id === selectedMainServiceId), 
    [selectedMainServiceId]
  );

  const subtotal = useMemo(() => {
    if (!selectedMainService) return 0;
    return Object.entries(selectedItems).reduce((acc, [name, qty]) => {
      const item = selectedMainService.subServices.find(s => s.name === name);
      const price = item?.price || 0;
      return acc + (price * (qty as number));
    }, 0);
  }, [selectedItems, selectedMainService]);

  const deliveryFee = useMemo(() => {
    const option = DELIVERY_OPTIONS.find(o => o.id === selectedDeliveryId);
    return option?.price || 0;
  }, [selectedDeliveryId]);

  const grandTotal = subtotal + deliveryFee;

  const handleConfirm = () => {
    // Generate WhatsApp Message
    const itemsList = Object.entries(selectedItems)
      .map(([name, qty]) => `- ${qty}x ${name}`)
      .join('\n');

    const message = `*MJ Laundry & Cleaning Services - New Booking*\n\n` +
      `*Service:* ${selectedMainService?.title}\n` +
      `*Logistics:* ${DELIVERY_OPTIONS.find(o => o.id === selectedDeliveryId)?.title}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total Amount:* ${formatCurrency(grandTotal)}\n\n` +
      `*Customer Details:*\n` +
      `*Name:* ${customerInfo.fullName}\n` +
      `*Phone:* ${customerInfo.phone}\n` +
      `*Address:* ${customerInfo.address}\n` +
      `*Date:* ${customerInfo.date}\n` +
      `${customerInfo.landmark ? `*Landmark:* ${customerInfo.landmark}\n` : ''}` +
      `${customerInfo.notes ? `*Notes:* ${customerInfo.notes}` : ''}`;

    const whatsappUrl = `https://wa.me/2348126325016?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Set success state
    setIsSubmitted(true);
  };

  const updateQuantity = (name: string, delta: number) => {
    setSelectedItems(prev => {
      const newQty = (prev[name] || 0) + delta;
      if (newQty <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: newQty };
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount).replace('NGN', '₦');
  };

  const isStep1Valid = !!selectedMainServiceId;
  const isStep2Valid = Object.keys(selectedItems).length > 0;
  const isStep3Valid = !!selectedDeliveryId;
  const isStep4Valid = customerInfo.fullName && customerInfo.phone && customerInfo.address && customerInfo.date;

  const renderStep1 = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {SERVICES.map((service) => (
        <motion.div
          key={service.id}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedMainServiceId(service.id);
            setSelectedItems({}); // Reset items when service changes
          }}
          className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 ${
            selectedMainServiceId === service.id
              ? 'border-brand-purple bg-brand-purple/5 shadow-xl shadow-brand-purple/10'
              : 'border-transparent bg-white shadow-sm hover:shadow-md'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
            selectedMainServiceId === service.id ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'bg-surface-grey text-brand-purple'
          }`}>
            {service.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed italic">{service.description}</p>
          {selectedMainServiceId === service.id && (
            <motion.div 
              layoutId="check"
              className="mt-4 flex items-center gap-2 text-brand-purple font-bold text-sm"
            >
              <CheckCircle2 size={16} /> Selected
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {selectedMainService?.subServices.map((item) => {
        const qty = selectedItems[item.name] || 0;
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
              qty > 0 ? 'border-brand-purple bg-brand-purple/5' : 'border-transparent bg-white'
            }`}
          >
            <div>
              <h4 className="font-bold text-lg">{item.name}</h4>
              <p className="text-brand-purple font-semibold">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-4">
              {qty > 0 && (
                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100">
                  <button 
                    onClick={() => updateQuantity(item.name, -1)}
                    className="w-8 h-8 rounded-lg bg-surface-grey hover:bg-gray-200 flex items-center justify-center text-brand-purple transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-6 text-center">{qty}</span>
                  <button 
                    onClick={() => updateQuantity(item.name, 1)}
                    className="w-8 h-8 rounded-lg bg-surface-grey hover:bg-gray-200 flex items-center justify-center text-brand-purple transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
              {qty === 0 && (
                <button
                  onClick={() => updateQuantity(item.name, 1)}
                  className="px-4 py-2 bg-brand-purple text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-purple/20 flex items-center gap-2 hover:bg-brand-purple-light transition-all"
                >
                  <Plus size={16} /> Add
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
      
      {/* Mini Summary for Step 2 */}
      <div className="mt-10 p-6 bg-text-dark rounded-3xl text-white flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Subtotal</p>
          <p className="text-2xl font-display font-extrabold text-brand-gold">{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-white/30" />
          <span className="font-bold">{Object.values(selectedItems).reduce((a, b) => (a as number) + (b as number), 0)} items</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {DELIVERY_OPTIONS.map((option) => (
        <motion.div
          key={option.id}
          whileHover={{ y: -3 }}
          onClick={() => setSelectedDeliveryId(option.id)}
          className={`cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 ${
            selectedDeliveryId === option.id
              ? 'border-brand-purple bg-brand-purple/5 shadow-lg shadow-brand-purple/5'
              : 'border-transparent bg-white shadow-sm'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              selectedDeliveryId === option.id ? 'bg-brand-purple text-white' : 'bg-surface-grey text-brand-purple'
            }`}>
              {option.id === 'self' ? <User size={24} /> : <Truck size={24} />}
            </div>
            <span className={`font-bold text-lg ${selectedDeliveryId === option.id ? 'text-brand-purple' : 'text-gray-400'}`}>
              {option.price === 0 ? 'FREE' : formatCurrency(option.price)}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1">{option.title}</h3>
          <p className="text-xs text-gray-500 italic">{option.description}</p>
          {selectedDeliveryId === option.id && (
            <motion.div layoutId="delivery-check" className="mt-4 text-brand-purple flex items-center gap-1 text-xs font-bold">
              <CheckCircle2 size={12} /> SELECTED
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <User size={14} className="text-brand-purple" /> Full Name
          </label>
          <input 
            type="text" 
            value={customerInfo.fullName}
            onChange={e => setCustomerInfo({...customerInfo, fullName: e.target.value})}
            placeholder="e.g. John Doe" 
            className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Phone size={14} className="text-brand-purple" /> Phone Number
          </label>
          <input 
            type="tel" 
            value={customerInfo.phone}
            onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
            placeholder="0812..." 
            className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none" 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold ml-1 flex items-center gap-2">
          <MapPin size={14} className="text-brand-purple" /> Pickup Address
        </label>
        <input 
          type="text" 
          value={customerInfo.address}
          onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
          placeholder="Detailed house address" 
          className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Calendar size={14} className="text-brand-purple" /> Preferred Pickup Date
          </label>
          <input 
            type="date" 
            value={customerInfo.date}
            onChange={e => setCustomerInfo({...customerInfo, date: e.target.value})}
            className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 flex items-center gap-2">
            <MapPin size={14} className="text-brand-gold" /> Landmark (Optional)
          </label>
          <input 
            type="text" 
            value={customerInfo.landmark}
            onChange={e => setCustomerInfo({...customerInfo, landmark: e.target.value})}
            placeholder="e.g. Near the big church" 
            className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none" 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold ml-1 flex items-center gap-2">
          <MessageSquare size={14} className="text-brand-purple" /> Additional Notes (Optional)
        </label>
        <textarea 
          rows={3} 
          value={customerInfo.notes}
          onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
          placeholder="instruction of how they want it to be done" 
          className="w-full p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/5 transition-all outline-none resize-none"
        ></textarea>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-8 border-b border-dashed border-gray-200 pb-6">
          <h4 className="font-display font-extrabold text-2xl text-brand-purple">{selectedMainService?.title}</h4>
          <div className="px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-bold uppercase tracking-widest">
            Order Review
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          {Object.entries(selectedItems).map(([name, qty]) => {
            const item = selectedMainService?.subServices.find(s => s.name === name);
            if (!item) return null;
            return (
              <div key={name} className="flex justify-between items-center text-sm md:text-base">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-surface-grey flex items-center justify-center font-bold text-brand-purple">{qty}</span>
                  <span className="font-medium">{name}</span>
                </div>
                <span className="font-bold">{formatCurrency((item?.price || 0) * (qty as number))}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t-2 border-dashed border-gray-100 space-y-3">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Service Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Logistics ({DELIVERY_OPTIONS.find(o => o.id === selectedDeliveryId)?.title})</span>
            <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold pt-4">
            <span>Total Amount</span>
            <span className="text-3xl font-display font-extrabold text-brand-purple">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-grey rounded-3xl p-6">
        <h4 className="font-bold text-sm uppercase text-gray-400 tracking-widest mb-4">Pickup Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-600"><User size={14} /> <span className="font-bold text-text-dark">{customerInfo.fullName}</span></p>
            <p className="flex items-center gap-2 text-gray-600"><Phone size={14} /> <span className="font-bold text-text-dark">{customerInfo.phone}</span></p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-600"><MapPin size={14} /> <span className="font-bold text-text-dark">{customerInfo.address}</span></p>
            <p className="flex items-center gap-2 text-gray-600"><Calendar size={14} /> <span className="font-bold text-text-dark">{customerInfo.date}</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  const stepsInfo = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Items' },
    { num: 3, label: 'Logistics' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Review' },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-brand-purple text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-purple/20"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-4xl font-display font-black mb-4">Booking Received!</h2>
        <p className="text-gray-500 mb-10 leading-relaxed italic">
          Your booking has been successfully recorded. We've redirected you to WhatsApp to finalize your collection. Our team will also confirm via email shortly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-8 py-4 bg-surface-grey text-brand-purple font-bold rounded-2xl hover:bg-gray-200 transition-all"
          >
            New Booking
          </button>
          <a 
            href={`mailto:mjlaundry@example.com?subject=New Booking Confirmation - ${customerInfo.fullName}&body=Hello MJ Laundry, I have successfully booked a service. Details: ${selectedMainService?.title}, Total: ${formatCurrency(grandTotal)}`}
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-text-dark font-bold rounded-2xl shadow-lg shadow-brand-gold/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Email Support <ArrowRight size={18} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 -z-0 hidden sm:block"></div>
        {stepsInfo.map((s) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-4 ${
              step >= s.num ? 'bg-brand-purple border-brand-purple text-white' : 'bg-white border-gray-200 text-gray-400'
            }`}>
              {step > s.num ? <CheckCircle2 size={18} /> : s.num}
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${
              step >= s.num ? 'text-brand-purple' : 'text-gray-400'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.4 }}
          className="min-h-[400px]"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-display font-black mb-2">
              {step === 1 && "Choose Your Service"}
              {step === 2 && `Items for ${selectedMainService?.title}`}
              {step === 3 && "How do we handle logistics?"}
              {step === 4 && "Where should we pick up?"}
              {step === 5 && "One last look!"}
            </h2>
            <p className="text-gray-500 italic">
              {step === 1 && "Select the main category of laundry service you need."}
              {step === 2 && "Add the items and quantities you want us to process."}
              {step === 3 && "Choose if you want doorstep delivery or self-pickup."}
              {step === 4 && "Tell us how and where to reach you for the collection."}
              {step === 5 && "Review your booking details before confirmation."}
            </p>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-3 flex items-center gap-2 font-bold text-gray-500 hover:text-brand-purple transition-all"
              >
                <ChevronLeft size={20} /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              onClick={step === 5 ? handleConfirm : nextStep}
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid) ||
                (step === 3 && !isStep3Valid) ||
                (step === 4 && !isStep4Valid)
              }
              className={`px-10 py-4 font-bold rounded-2xl flex items-center gap-2 transition-all shadow-xl ${
                ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid) || (step === 4 && isStep4Valid) || step === 5)
                ? 'bg-brand-purple text-white shadow-brand-purple/20 hover:bg-brand-purple-light cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed transform-none'
              }`}
            >
              {step === 5 ? (
                <>Confirm Booking <CheckCircle2 size={20} /></>
              ) : (
                <>Continue <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
