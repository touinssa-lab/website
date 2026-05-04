import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AIGuideChat from "@/components/AIGuideChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const AdminAIGuide = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">로컬 AI 여행가이드 (관리자용)</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  지역별 AI 페르소나와 대화하며 서비스 품질을 테스트할 수 있습니다. 
                  <span className="ml-2 text-green-600 font-bold">※ 관리자 모드: 질문 횟수 제한 없음</span>
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 bg-slate-50/30">
            {/* 공통 챗봇 컴포넌트 호출 (관리자용: 질문 제한 비활성) */}
            <AIGuideChat isUnlimited={true} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAIGuide;
