import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, X } from "lucide-react";

interface PanelAccessNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PanelAccessNoticeModal = ({ isOpen, onClose, onConfirm }: PanelAccessNoticeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 h-8 w-8">
            <X className="h-4 w-4 text-slate-400" />
          </Button>
        </div>

        <div className="p-8 pt-10">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-bounce-subtle">
            <ShieldCheck className="w-8 h-8 text-rose-500" />
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">패널 가입 회원 전용 기사입니다</h3>
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium px-2">
              해당 콘텐츠를 이용하시려면 <br/>
              설문조사 패널로 등록해 주세요. <br/><br/>
              소셜 로그인 방식으로 안전하고 <br/>
              빠르게 가입하실 수 있습니다.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50/50 border-t border-slate-100 flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:bg-white transition-all border-slate-200"
          >
            취소
          </Button>
          <Button 
            onClick={onConfirm} 
            className="flex-1 h-12 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            설문조사 패널 가입 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PanelAccessNoticeModal;
